//Composant client du form de l'event

"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createMeeting from "@/actions/meeting/createMeeting";
import modifyMeeting from "@/actions/meeting/modifyMeeting";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { UsersWithIdAndName } from "./type";
import { CalendarEventExternal } from "@schedule-x/calendar";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useState, useTransition } from "react";
import deleteMeeting from "@/actions/meeting/deleteMeeting";
import {
  getDateFormatedToString,
  getTimeFormatedToString,
} from "@/lib/utils/temporal/temporalUtils";
import { Spinner } from "@/components/ui/spinner";

//Les schema zod du form
const formSchema = z.object({
  name: z
    .string()
    .min(1, "Veuillez choisir un nom d'évènement")
    .max(30, "30 charactères maximum"),
  day: z.string("Veuillez choiri un jour"),
  hour_from: z.iso.time("Veuillez choisir une heure de début"),
  hour_to: z.iso.time("Veuillez choisir une heure de fin"),
  attendees: z.array(z.string()),
});

export default function EventForm({
  eventDateTime,
  event,
  setOpen,
  users,
  roomId,
  mode,
}: {
  eventDateTime?: Temporal.ZonedDateTime;
  event?: CalendarEventExternal;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users: UsersWithIdAndName;
  roomId: number;
  mode: string;
}) {
  //Nécessaire au refresh lors de la création ou modification d'event.
  const router = useRouter();

  //Référence pour pouvoir afficher les nom des attendees
  const anchor = useComboboxAnchor();

  //Le state qui ouvre ou ferme la confirmation de suppression de la réunion
  const [delDialogOpen, setDelDialogOpen] = useState<boolean>(false);

  //Permet d'afficher quelque chose durant le chargement des données
  const [isPending, startTransition] = useTransition();

  //Valeurs par défault de l'event, en fonction du mode "create" ou "update"
  const defaultValues =
    mode === "create"
      ? {
          name: "",
          day: eventDateTime
            ? (eventDateTime as Temporal.ZonedDateTime).toPlainDate().toString()
            : getDateFormatedToString(new Date()),
          hour_from: getTimeFormatedToString(
            eventDateTime!.hour,
            eventDateTime!.minute,
          ),
          hour_to: `${(eventDateTime!.hour + 1).toString().padStart(2, "0")}:${eventDateTime!.minute.toString().padStart(2, "0")}`,
          attendees: [],
        }
      : {
          name: event!.title,
          day: (event!.start as Temporal.ZonedDateTime)
            .toPlainDate()
            .toString(),
          hour_from: getTimeFormatedToString(
            (event!.start as Temporal.ZonedDateTime).hour,
            (event!.start as Temporal.ZonedDateTime).minute,
          ),
          hour_to: getTimeFormatedToString(
            (event!.end as Temporal.ZonedDateTime).hour,
            (event!.end as Temporal.ZonedDateTime).minute,
          ),
          attendees:
            event!.people?.map((attendee) => {
              const response = users.find((user) => user.name === attendee);
              return response ? response.id : "";
            }) || [],
        };

  //L'initialisation de form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  //Le onSumbit va lancer les infos du meeting à la server action
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { name, day, hour_from, hour_to, attendees } = data;

      //Si on doit créer un évènement
      if (mode === "create") {
        //eventDateTime sera toujours défini dans le cas d'un create, mais on indique return pour que typescript soit content
        if (!eventDateTime) return;

        //On obtient les heures et minutes de début et de fin de l'évènement, puis on créer une date avec ces données et celle initiales fournies par schedule-x
        const [year, month, dayNum] = day.split("-").map(Number);
        const [hourFrom, minuteFrom] = hour_from.split(":").map(Number);
        const [hourTo, minuteTo] = hour_to.split(":").map(Number);
        const dateFrom = new Date(
          year,
          month - 1,
          dayNum,
          hourFrom,
          minuteFrom,
        );
        const dateTo = new Date(year, month - 1, dayNum, hourTo, minuteTo);
        const dayFormated = new Date(day);
        const formatedDatas = {
          name,
          day: dayFormated,
          hour_from: dateFrom,
          hour_to: dateTo,
          attendees,
          roomId,
        };

        //On créer l'event via server action, et on refresh pour activer le useState de Agenda et refetch les events.
        const response = await createMeeting(formatedDatas);
        if (response.success) {
          setOpen(false);
          toast("Réunion bien enregistrée");
          router.refresh();
        } else {
          toast(response.message as string);
        }
      }

      //Si on doit modifier l'évènement
      else if (mode === "update") {
        //event sera toujours défini dans le cas d'un update, mais on indique return pour que typescript soit content
        if (!event) return;

        //On obtient les heures et minutes de début et de fin de l'évènement, puis on créer une date avec ces données et celle initiales fournies par schedule-x
        const [year, month, dayNum] = day.split("-").map(Number);
        const [hourFrom, minuteFrom] = hour_from.split(":").map(Number);
        const [hourTo, minuteTo] = hour_to.split(":").map(Number);
        const dateFrom = new Date(
          year,
          month - 1,
          dayNum,
          hourFrom,
          minuteFrom,
        );
        const dateTo = new Date(year, month - 1, dayNum, hourTo, minuteTo);
        const dayFormated = new Date(day);
        const formatedDatas = {
          name,
          day: dayFormated,
          hour_from: dateFrom,
          hour_to: dateTo,
          attendees,
          roomId,
        };

        //On modifie l'event via server action, et on refresh pour activer le useState de Agenda et refetch les events.
        const response = await modifyMeeting(
          formatedDatas,
          event.id.toString(),
        );
        if (response.success) {
          setOpen(false);
          toast("Réunion bien modifiée");
          router.refresh();
        } else {
          toast(response.message as string);
        }
      }
    });
  };

  //Fonction qui prends en charge les étapes de la suppression d'une réunion, passé au composant ConfirmDialog
  const handleDelete = async () => {
    const response = await deleteMeeting(Number(event!.id));
    if (response.message) {
      setOpen(false);
      router.refresh();
      toast("Réunion bien supprimée");
    } else {
      toast(
        "Problème lors de la suppression de la réunion : " + response.message,
      );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <FieldGroup>
        {/* L'input pour le nom de la réunion */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Nom de la réunion</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Réunion d'équipe"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        {/* L'input du jour de la réunion */}
        <Controller
          name="day"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="day">Jour de la réunion</FieldLabel>
                <Input
                  {...field}
                  id="day"
                  type="date"
                  aria-invalid={fieldState.invalid}
                  placeholder="Jour de la réunion"
                  autoComplete="off"
                />
              </Field>
            );
          }}
        />

        {/* L'input pour le début de la réunion */}
        <Controller
          name="hour_from"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="hour_from">Heure de début</FieldLabel>
                <Input
                  {...field}
                  id="hour_from"
                  aria-invalid={fieldState.invalid}
                  type="time"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        {/* L'input pour la fin de la réunion */}
        <Controller
          name="hour_to"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="to">Heure de fin</FieldLabel>
                <Input
                  {...field}
                  id="hour_to"
                  aria-invalid={fieldState.invalid}
                  type="time"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        {/* Le controleur pour un Combobox avec des Chips pour les participants à la réunion */}
        <Controller
          name="attendees"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="to">Participants</FieldLabel>

                {/* Dans le Field, on mets une Combobox.Dans celle-ci, on dit que ComboboxChips a une ref qui dit que c'est en-dessous qu'il faudra afficher ComboboxContent.
                Dans ComboboxChips, on va donner la value de Combobox, ou on passe values (toutes les value sélectionnées), pour ensuite choisir ce qu'on va montrer en fonction de nos données. On passe alors notre donnée dans ComboboxChip pour l'affichage.
                On met ensuite le ComboboxChipsInput en-dessous du .map() */}
                <Combobox
                  items={users}
                  multiple
                  onValueChange={(value: string[]) => field.onChange(value)}
                  defaultValue={defaultValues.attendees}
                >
                  <ComboboxChips ref={anchor}>
                    <ComboboxValue>
                      {(values) => {
                        return (
                          <>
                            {values.map((value: string) => {
                              const user = users.find(
                                (userToFind) => userToFind.id === value,
                              );
                              if (!user) return;
                              return (
                                <ComboboxChip key={user.name}>
                                  {user.name}
                                </ComboboxChip>
                              );
                            })}
                            <ComboboxChipsInput
                              id="attendees"
                              aria-invalid={fieldState.invalid}
                              type="text"
                              placeholder="Collaborateur..."
                            />
                          </>
                        );
                      }}
                    </ComboboxValue>
                  </ComboboxChips>
                  <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>Pas de collaborateur trouvé</ComboboxEmpty>
                    <ComboboxList>
                      {users.map((user) => (
                        <ComboboxItem key={user.id} value={user.id}>
                          {user.name}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
      </FieldGroup>
      <section id="form-buttons" className="grid grid-cols-4">
        <Button className="col-span-2" type="submit">
          {isPending ? <Spinner /> : "Enregistrer"}
        </Button>
        <Button
          type="button"
          className="col-span-2"
          onClick={() => setOpen(false)}
        >
          Annuler
        </Button>
        {mode === "update" && (
          <Button
            type="button"
            onClick={() => setDelDialogOpen(true)}
            className="col-span-2 row-start-2 col-start-3 bg-red-500 border border-white hover:bg-red-400 flex justify-evenly items-center"
          >
            Supprimer
            <Trash2 className="text-white w-5" />
          </Button>
        )}
        <ConfirmDialog
          open={delDialogOpen}
          setOpen={setDelDialogOpen}
          action={() => {
            handleDelete();
          }}
        />
      </section>
    </form>
  );
}

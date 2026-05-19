export default function canModify(authorId: string, userConnectedId: string) {
  if (authorId !== userConnectedId) return false;

  return true;
}

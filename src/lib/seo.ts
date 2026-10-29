export function setPageMeta(title: string, description: string): void {
  document.title = `${title} | NestWell Developers`;
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) descriptionTag.setAttribute('content', description);
}

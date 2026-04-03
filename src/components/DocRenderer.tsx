import { DocumentRenderer } from '@keystatic/core/renderer';

interface Props {
  document: Parameters<typeof DocumentRenderer>[0]['document'];
}

export default function DocRenderer({ document }: Props) {
  return <DocumentRenderer document={document} />;
}

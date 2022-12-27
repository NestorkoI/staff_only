import { Loader, Placeholder } from 'rsuite';

const Loading = () => (
  <div>
    <Placeholder.Paragraph rows={8} />
    <Loader backdrop content="loading..." vertical />
  </div>
);

export default Loading;

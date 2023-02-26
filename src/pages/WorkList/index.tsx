import WorkListProvider from '../../context/work-list.context';
import WorkList from './WorkList';

const WorkListLayout = () => {
  return (
    <WorkListProvider>
      <WorkList />
    </WorkListProvider>
  );
};

export default WorkListLayout;

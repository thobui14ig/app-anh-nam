import TaskProvider from '../../context/task.context';
import ReportHOC from './Report';
import Report from './Report';

const ReportLayout = () => {
  return (
    <TaskProvider>
      <ReportHOC />
    </TaskProvider>
  );
};

export default ReportLayout;

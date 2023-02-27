import TaskProvider from '../../context/task.context';
import Task from './Task';

const ReportLayout = () => {
  return (
    <TaskProvider>
      <Task />
    </TaskProvider>
  );
};

export default ReportLayout;

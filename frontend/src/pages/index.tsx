import React, { useState, useCallback, useEffect } from 'react';
import { css } from '@emotion/react';
import TaskAPI from '@/api/task.api';
import { TaskDTO } from '@/types/task.types';

const IndexPage = () => {
  const [ tasks, setTasks, ] = useState<TaskDTO[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const resp = await TaskAPI.getAll();
      setTasks(resp);
    };

    fetchAll();
  }, []);

  const style = css``;

  return (
    <>
      <div css={style}>
        {tasks.map((task) => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.status === 'Created' && '진행 대기중'}</p>
            <p>{task.status === 'InProgress' && '진행중'}</p>
            <p>{task.status === 'Done' && '완료'}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default IndexPage;

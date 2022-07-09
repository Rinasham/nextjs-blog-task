// for tasks
// get all task data when building
export async function getAllTasksData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const allTasks = await res.json();
  console.log(allTasks);
  const sortedTasks = allTasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return sortedTasks;
}

// get the array of all tasks IDs
export async function getAllTaskIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const allTasks = await res.json();
  const allIds = allTasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });

  return allIds;
}

// get details of all  blog posts
export async function getTaskDetail(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`)
  );
  const task = await res.json();

  return task;
}

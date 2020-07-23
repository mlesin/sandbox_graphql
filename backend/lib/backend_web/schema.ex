defmodule SandboxWeb.Schema do
  use Absinthe.Schema

  alias SandboxWeb.TasksResolver

  object :task do
    field :id, non_null(:id)
    field :task, non_null(:string)
    field :description, non_null(:string)
  end

  query do
    @desc "Get all tasks"
    field :all_tasks, non_null(list_of(non_null(:task))) do
      resolve(&TasksResolver.all_tasks/3)
    end
  end

  mutation do
    @desc "Create a new task"
    field :create_task, :task do
      arg(:task, non_null(:string))
      arg(:description, non_null(:string))

      resolve(&TasksResolver.create_task/3)
    end
  end
end

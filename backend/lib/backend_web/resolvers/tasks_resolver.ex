defmodule SandboxWeb.TasksResolver do
  alias Sandbox.Todos

  def all_tasks(_root, _args, _info) do
    {:ok, Todos.list_tasks()}
  end

  def create_task(_root, args, _info) do
    # TODO: add detailed error message handling later
    case Todos.create_task(args) do
      {:ok, task} ->
        {:ok, task}

      error ->
        {:error, "Could not create task: #{inspect(error)}"}
    end
  end
end

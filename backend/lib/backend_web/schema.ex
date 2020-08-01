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

  subscription do
    @desc "Subscribes for task additions"
    field :task_added, :task do
      # arg(:task, non_null(:string))

      config(fn args, _ ->
        IO.puts("in subscription config")
        IO.inspect(args)
        {:ok, topic: "*", context_id: "global"}
      end)

      # this tells Absinthe to run any subscriptions with this field every time
      # the :create_task mutation happens.
      # It also has a topic function used to find what subscriptions care about
      # this particular comment
      trigger(:create_task,
        topic: fn task ->
          IO.puts("in subscription trigger")
          IO.inspect(task)
          "*"
        end
      )

      # resolve(fn task, _, _ ->
      #   # this function is often not actually necessary, as the default resolver
      #   # for subscription functions will just do what we're doing here.
      #   # The point is, subscription resolvers receive whatever value triggers
      #   # the subscription, in our case a comment.
      #   {:ok, task}
      # end)
    end
  end
end

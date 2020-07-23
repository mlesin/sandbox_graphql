defmodule Sandbox.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :task, :string
      add :description, :text

      timestamps()
    end

  end
end

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Sandbox.Repo.insert!(%Sandbox.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Sandbox.Todos.Task
alias Sandbox.Repo

%Task{task: "Important task", description: "The Best Query Language"} |> Repo.insert!()
%Task{task: "Other task", description: "Awesome GraphQL Client"} |> Repo.insert!()

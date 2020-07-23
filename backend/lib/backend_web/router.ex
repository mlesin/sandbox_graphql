defmodule SandboxWeb.Router do
  use SandboxWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: SandboxWeb.Schema,
      interface: :simple,
      context: %{pubsub: SandboxWeb.Endpoint}

    forward "/", Absinthe.Plug, schema: SandboxWeb.Schema
  end
end

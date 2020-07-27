defmodule SandboxWeb.Router do
  use SandboxWeb, :router
  @dialyzer {:nowarn_function, __checks__: 0}

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
  end

  scope "/" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: SandboxWeb.Schema,
      interface: :simple,
      context: %{pubsub: SandboxWeb.Endpoint},
      socket: SandboxWeb.UserSocket

    forward "/graphql", Absinthe.Plug, schema: SandboxWeb.Schema
  end

  scope "/", SandboxWeb do
    pipe_through :browser

    get "/", AppController, :index
  end
end

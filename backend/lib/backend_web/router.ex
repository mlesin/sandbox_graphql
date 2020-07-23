defmodule SandboxWeb.Router do
  use SandboxWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SandboxWeb do
    pipe_through :api
  end
end

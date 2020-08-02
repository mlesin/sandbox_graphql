defmodule SandboxWeb.AppController do
  use SandboxWeb, :controller

  # Disable rendering any layout for this controller
  plug :put_layout, false
end

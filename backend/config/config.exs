# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :backend,
  namespace: Sandbox,
  ecto_repos: [Sandbox.Repo]

# Configures the endpoint
config :backend, SandboxWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "qBDNMg0r8s+UO0A5Uma9D218EnQirOYsGP3EOAfL+Xwd5gagNL1toJQyDRGIkHoM",
  render_errors: [view: SandboxWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Sandbox.PubSub,
  live_view: [signing_salt: "YKdrajTk"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

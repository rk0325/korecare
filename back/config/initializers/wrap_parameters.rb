ActiveSupport.on_load(:action_controller) do
  wrap_parameters false
end
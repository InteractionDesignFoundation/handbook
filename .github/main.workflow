workflow "Main workflow" {
  on = "push"
  resolves = ["liche"]
}

action "liche" {
  uses = "peaceiris/actions-liche@v0.1.0"
  args = ["-r", "./*"]
}

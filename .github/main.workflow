workflow "Check markdown links" {
  on = "push"
  resolves = ["markdown-link-check"]
}

action "markdown-link-check" {
  uses = "./"
}

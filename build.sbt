name := "ándaga-core"
version := "0.0.1"

description := "core engine of the ándaga time-tracking system"

scalaVersion := "2.12.6"

val Http4sVersion = "0.18.21"
val Specs2Version = "4.1.0"
val LogbackVersion = "1.2.3"

libraryDependencies ++= Seq(
  "org.http4s"      %% "http4s-blaze-server" % Http4sVersion,
  "org.http4s"      %% "http4s-circe"        % Http4sVersion,
  "org.http4s"      %% "http4s-dsl"          % Http4sVersion,
  "org.specs2"     %% "specs2-core"          % Specs2Version % "test",
  "ch.qos.logback"  %  "logback-classic"     % LogbackVersion
)

addCompilerPlugin("org.spire-math" %% "kind-projector"     % "0.9.6")
addCompilerPlugin("com.olegpy"     %% "better-monadic-for" % "0.2.4")


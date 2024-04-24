port module Ports.Editor exposing (editorInit, layoutGraph, layoutDone, findFit, fitDone, loadFile, saveData)

import Json.Encode exposing (Value)

port editorInit : Value -> Cmd msg

port layoutGraph : Value -> Cmd msg

port layoutDone : (Value -> msg) -> Sub msg

port findFit : Value -> Cmd msg

port fitDone : (Value -> msg) -> Sub msg

port loadFile : (Value -> msg) -> Sub msg

port saveFile : (Value -> msg) -> Sub msg

port saveData : Value -> Cmd msg

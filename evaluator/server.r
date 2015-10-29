library(httpuv)
library(jsonlite)
library(magrittr)
library(gdata)
library(Cairo)
library(png)
library(ggplot2)
library(base64enc)

serveAsJSON <- function (data) {
  body <- toString(toJSON(data))
  size <- nchar(body)
  headers <- list('Content-Type' = 'application/json', "Content-Length" = size)
  list(status = 200L, headers = headers, body = body)
}

appEnv <- new.env()

evaluateMessage <- function(message) {
    tempPath <- paste("./temp-", sample(10^12, 1),".png", sep="")

    png(file = tempPath, bg = "transparent")
    result <- eval(parse(text = message), envir=appEnv)
    dev.off()

    if (file.exists(tempPath)) {
      print("got binary")
      size <- file.size(tempPath)
      bin <- base64encode(readBin(tempPath, "raw", n = size))
      result <- NA
      unlink(tempPath)
    } else {
      print("no binary")
      bin <- NA
    }

    list(result = result, bin = bin, ls = eapply(appEnv, typeof))
}

webApp <- list(
  call = function (req) {
    serveAsJSON(list(status="live"))
  },
  onWSOpen = function(ws) {
    ws$onMessage(function(binary, message) {
      print(paste("Just received message", message))

      result = tryCatch({
          evaluateMessage(message)
        },
        error = function(cond) {
          message(paste("Error during evaluation of message: ", message))
          message(cond)
          return("Error")
        }
      )
      json <- toString(toJSON(list(value=result)))
      ws$send(json)
    })
  }
)

runServer("0.0.0.0", 9454, webApp)
# To check status: browseURL("http://localhost:9454/")

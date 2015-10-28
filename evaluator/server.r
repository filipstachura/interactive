library(httpuv)
library(jsonlite)
library(magrittr)
library(gdata)
library(Cairo)
library(png)
library(ggplot2)

getBinaryPlot <- function() {
  tempPath <- paste("./temp-", sample(10^12, 1),".png", sep="")
  qplot(rnorm(sample(1000,1)))
  ggsave(tempPath, width = 4, height = 3)
  size <- file.size(tempPath)
  bin <- readBin(tempPath, "raw", n = size)
  unlink(tempPath)
  bin
}

serveAsJSON <- function (data) {
  body <- toString(toJSON(data))
  size <- nchar(body)
  headers <- list('Content-Type' = 'application/json', "Content-Length" = size)
  list(status = 200L, headers = headers, body = body)
}

appEnv <- new.env()

webApp <- list(
  call = function (req) {
    serveAsJSON(list(status="live"))
  },
  onWSOpen = function(ws) {
    ws$onMessage(function(binary, message) {
      print(paste("Just received message", message))

      result = tryCatch({
          eval(parse(text = message), envir=appEnv)
        },
        error = function(cond) {
          message(paste("Error during evaluation of message: ", message))
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

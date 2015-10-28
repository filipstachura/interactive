library(httpuv)
library(shiny) # using only helper functions like parseQueryString
library(magrittr)
library(gdata)
library(Cairo)
library(png)
library(ggplot2)
library(jsonlite)

setwd("~/Projects/R/http")

setRequest <- function (path) {
  startsWith(path, '/set')
}
getRequest <- function (path) {
  startsWith(path, '/get')
}
staticRequest <- function (path) {
  startsWith(path, '/public')
}
plotRequest <- function (path) {
  startsWith(path, '/plot.png')
}

getHeaders <- function (path) {
  len <- nchar(path)
  if (substr(path, len - 3, len) == ".css") {
    return(list('Content-Type' = 'text/css'))
  } 
  return(list('Content-Type' = 'text/html'))
}

serveStatic <- function (path) {
  body <- readLines(path) %>% paste(collapse = '\n')
  headers <- getHeaders(path)
  list(status = 200L, headers = headers, body = body)
}

getBinaryPlot <- function() {
  tempPath <- paste("./temp-", sample(10^12, 1),".png", sep="")
  qplot(rnorm(sample(1000,1)))
  ggsave(tempPath, width = 4, height = 3)
  size <- file.size(tempPath)
  bin <- readBin(tempPath, "raw", n = size)
  unlink(tempPath)
  bin
}

servePlot <- function (path) {
  body <- getBinaryPlot()
  size <- length(body)
  headers <- list('Content-Type' = 'image/png', "Content-Length" = size)
  list(status = 200L, headers = headers, body = body)
}

serveOK <- function () {
  body <- toString(toJSON(list(status="success")))
  size <- nchar(body)
  headers <- list('Content-Type' = 'application/json', "Content-Length" = size)
  list(status = 200L, headers = headers, body = body)
}
serveAsJSON <- function (value) {
  body <- toString(toJSON(list(value=value)))
  size <- nchar(body)
  headers <- list('Content-Type' = 'application/json', "Content-Length" = size)
  list(status = 200L, headers = headers, body = body)
}

setValue <- function(name, value) {
  print(paste("Setting ", name, "to", value)) 
  assign(name, value, envir = appEnv)
}

getValue <- function(getDict) {
  name <- names(getDict[1])
  print(paste("Getting ", name)) 
  appEnv[[name]]
}

setValues <- function(toSet) {
  size <- length(toSet)
  lapply(1:size, function(i) {
    setValue(names(toSet[i]), toSet[[i]])
  })
}

appEnv <- new.env()

webApp <- list(
  call = function (req) {
    path <- req$PATH_INFO
    localpath <- paste(".", path, sep="")
    
    if (setRequest(path)) {
      print("Set request")
      setValues(parseQueryString(req$QUERY_STRING))
      return(serveOK())
    }
    if (getRequest(path)) {
      print("Get request")
      value <- getValue(parseQueryString(req$QUERY_STRING))
      return(serveAsJSON(value))
    }
    
    if (staticRequest(path)) {
      return(serveStatic(localpath))
    }
    
    if (plotRequest(path)) {
      return(servePlot(localpath))
    }
    
    serveStatic("./public/index.html")    
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
      print(paste("Return: ", result))
      
      json <- toString(toJSON(list(value=result)))
      
      print(json)
      
      ws$send(json)
    })
  }
)

browseURL("http://localhost:9454/")
runServer("0.0.0.0", 9454, webApp)

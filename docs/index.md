[Mkdocs]: https://www.mkdocs.org/

# Scale Interface Project: Installation Guide

> By: Nick DiGennaro, David Wimmel, Wael Elsharkawy, John Meyer

## Preface

### Introduction

### Audience

These installation instructions are for anyone planning on using this
software. The rest of the documentation (Contributing, Hardware, SRC code
documentation, etc) is for developers.

## System Requirements

* A computer running windows 10

* Preferably 4GB of RAM or greater

* Preferably MS Excel

    * While not necessary to use the software, will be useful for looking over
      results of experiments in progress and making modifications to experiment
      data on the fly.

## Starting Application
* Turn on scale
* Plug scale into tablet
* Launch StartScaleApp.sh
    * Scale is connected properly if resulting console displays, "Created Server" "Created Web Sockets"

## Troubleshooting
* If console does not display "Created Server" "Created Web Sockets", ensure:
    * Scale is connected to tablet
    * Scale is powered on

## Building these docs

This document is written in Markdown and rendered as a web page using [Mkdocs]:

```bash
pip3 install mkdocs mkdocs-material

git clone https://gitlab.com/0x326/miami-university-senior-capstone-project.git
cd miami-university-senior-capstone-project/
mkdocs build
```

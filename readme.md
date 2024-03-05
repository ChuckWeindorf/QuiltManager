# Quilting Management

An app paired with Etsy for managing craft work.  Utilizes APIs from Etsy to import data and prevent duplicate entry.
The site allows a guest to select from available patterns after contact through etsy.

## Description

Phase I is to maintain an accurate copy of customers from within and 
outside of ETSY for a craft quilting business.  
Customers table retains unique customers.
Sales table must link to a customer and serves as the workorder object
Sales_artifacts are both the patterns and pictures related to a workorder
Artifacts contains the category, path and name of each image

## Getting Started

The Node app requires the companion React app QuiltingManagement
Node must have access to the local file system beneath the root HTTP(s) location in subfolder /Artifacts
Node requires a database structure quiltingdb


### Dependencies

A SQL database retains all tables and data.  Local disk access in /Artifacts folder

### Installing

I am not sure of the installation steps with a website yet - will investigate build and deploy in the future

### Executing program

For now it runs local under NPM - NPM RUN DEV

## Help

Questions welcome to the author

## Authors

Charles Weindorf - charles.weindorf@mudsox.com
https://www.mudsox.com
https://www.linkedin.com/in/charles-weindorf-engineer/
https://charlesweindorf.com

## Version History

* 1.0
    * Initial Deploy Version intended for www.debbie-intarsia.com
* 0.1
    * Presented for graduation project to TrueCoders 

## License

This project remains property of Charles Weindorf.

## Acknowledgments

Inspired by my wife who works harder than I do.

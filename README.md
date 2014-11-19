# grapher
=======

A simple crawler on Wikipedia info written in Ruby using wikimedia JSON API.
It parses the Wikipedia link structure into a database graph structure with decorated nodes:
 - Word counts
 - Title list

All dedicated to topic relationship and edition.

Main purpose is to provide with different information retrieval plugins a generic Wikipedia crawler. 

## History

First it was a multithreaded adhoc console application made in java with a PostgreSQL backend (mid 2012)

Later it was redesigned with Anemone and a neo4j backend (Start of 2013)

Last try is a Nutch 2.x based approach to a neo4j backend (Start of 2014) and discarded it almost inmediately due to nonexistent documentation.

Considering now using Heritrix over neoj4 or implementing a graph extending algorithm on neo4j.

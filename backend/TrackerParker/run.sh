#!/bin/sh
# The Java runtime reads JAVA_TOOL_OPTIONS itself; do not expand it here twice.
exec java -jar /var/task/TrackerParker.jar

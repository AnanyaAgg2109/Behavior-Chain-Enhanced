import os

os.environ["PYSPARK_SUBMIT_ARGS"] = "--conf spark.driver.extraJavaOptions=--add-opens=java.base/sun.nio.ch=ALL-UNNAMED pyspark-shell"

import streamlit as st
from pyspark.sql import SparkSession
import pandas as pd

# -----------------------------------
# PAGE CONFIG
# -----------------------------------
st.set_page_config(
    page_title="BehaviorChain",
    layout="wide"
)

# -----------------------------------
# LOAD FRONTEND FILES
# -----------------------------------
with open("index.html", "r", encoding="utf-8") as f:
    html_code = f.read()

with open("style.css", "r", encoding="utf-8") as f:
    css_code = f.read()

with open("script.js", "r", encoding="utf-8") as f:
    js_code = f.read()

# -----------------------------------
# DISPLAY FRONTEND
# -----------------------------------
st.title("BehaviorChain")

st.markdown("## Frontend Behavioral Intelligence Platform")

frontend = f"""
<style>
{css_code}
</style>

{html_code}

<script>
{js_code}
</script>
"""

st.components.v1.html(frontend, height=900, scrolling=True)

# -----------------------------------
# PYSPARK SECTION
# -----------------------------------
st.markdown("---")
st.header("PySpark Behavioral Analytics Engine")

# Start Spark
spark = SparkSession.builder \
    .appName("BehaviorChain") \
    .master("local[*]") \
    .getOrCreate()

# -----------------------------------
# LOAD DATASET
# -----------------------------------
df = spark.read.csv(
    "behavioral_data.csv",
    header=True,
    inferSchema=True
)

# -----------------------------------
# SHOW DATA
# -----------------------------------
st.subheader("Behavioral Dataset")

st.dataframe(df.toPandas())

# -----------------------------------
# EVENT COUNTS
# -----------------------------------
st.subheader("Behavior Event Counts")

event_counts = df.groupBy("event").count()

st.dataframe(event_counts.toPandas())

# -----------------------------------
# AVERAGE SCORES
# -----------------------------------
st.subheader("Average Behavioral Scores")

avg_scores = df.groupBy("event").avg("score")

st.dataframe(avg_scores.toPandas())

# -----------------------------------
# SUCCESS
# -----------------------------------
st.success("Frontend + PySpark integration successful.")
# Sanity-Check
This repository belongs to the project we -team Sanity Check- are creating with our ambition, for submitting to the CS210 Introduction to Data Science Course.
# Comparative Education Index in Turkey, Before and After

## Team Sanity Check
- Serhan YILMAZ
- Bilgehan Bilgin
- Mustafa Harun Şendur
- Beste Bayhan

## Project Overview
This project aims to develop a machine learning model that predicts an education index for every province in Turkey. The model utilizes data from various sources, including istatistik.meb.gov.tr and the United Nations Development Programme (UNDP). The data is collected across four different education levels: Kindergarten, Primary School, Secondary School, and High School, spanning the years 2012 to 2020.

## Hypothesis
There is a significant correlation between the factors of Student per Teacher, Student per School, Student per Classroom, Budget per Student, and the Human Development Index (HDI), and the education index of provinces in Turkey. By leveraging these factors, we claim the COVID-19 pandemic was a major contributor to the Education Accessibility and Quality in Turkey, and has affected poorer, small regions more than metropolitan areas.
## Data Collection
Data was collected from various sources including:
- MEB Statistics
- United Nations Statistics
- Ministry of Treasury and Finance

## Data Organization
Data cleaning and formatting was a crucial step in our project. It involved preparing and standardizing the raw data to ensure it's suitable for analysis. This process included handling missing or inconsistent data, removing outliers, and converting data into a format that our machine learning models can understand.

## Derivation of New Functional Data
We derived new functional data by creating ratios useful for our calculations, such as Student per Teacher, Student per Classroom, Student per School, and Education Budget per Student.

## Calculating the Education Index
We determined the weights for the relevant features in our dataset and normalized the data using these determined weights to calculate the Education Index.

## Data Visualization
We visualized our data using various methods including Histograms for frequencies of Education Indices, Correlation Heatmaps for analyzing the correlations of features, Stacked Bar Charts for numbers of students & teachers by education level, Scatter Plots for HDI Index & Teacher per Student Correlation, Radial Bar Charts for Education Budget per Province, and Scatter Plots for Education Index vs HDI Index.

# nytimes-scraper
Bookmarklet for Chrome that scrapes and downloads articles from NY Times search page

To use bookmarklet:
- Create bookmark in Google Chrome
- Copy and paste scraper.min.js file into URL and then save
- Navigate to https://www.nytimes.com/search/
- Enter query, start date, and end date
- Click bookmarklet and open console to monitor progress
- After articles are parsed, they are downloaded into a .csv file that is '^' delimited
  - The file name is \<query>_\<start_date>_to_\<end_date>.csv
  - Example: machine_learning_20181101_to_20181102.csv

`WARNING`: I have found that Excel is often unable to display all of the results for whatever reason. To view the results, I generally use the read_csv function from the pandas python library with the delimiter = '^'.

`NOTE`: If thousands of results are returned, the code will continue to click the "Show More" button every 0.75 seconds at the bottom of the page to render more results. For each click, approximately 10 results are added to the page so displaying thousands of results will take time to finish rendering all the HTML content. 

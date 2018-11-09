javascript: (function () {

    // Get parameters from URL
    let urlString    = document.URL;
    let url          = new URL(urlString);
    const query      = url.searchParams.get("query").replace(" ", "_");
    const start_date = url.searchParams.get("startDate");
    const end_date   = url.searchParams.get("endDate");

    // Make file name from search parameters
    const saveName = query + "_" + start_date + "_to_" + end_date + ".csv";

    // Find number of results
    let regex       = /\d+/g;
    const n_results = Number(document.querySelector(
        "p[class='SearchForm-searchStatus--2Z3Tw']"
        ).textContent.match(regex).join(""));
        console.log(`[SEARCH] ${n_results} results found for query ${query} ` +
        `in date range ${start_date} to ${end_date}`);
        
    // Click button to show more
    const DELIMITER = "^";
    var csvContent  = "", content = {};
    if(document.querySelector("div[class='Search-showMore--Plid0']")){
        var clicks = 0;
        var showMore = setInterval(function(){
            if(document.querySelector("div[class='Search-showMore--Plid0']")){ 
                document.querySelector("div[class='Search-showMore--Plid0']").
                    querySelector("button[type='button']").click();
                clicks += 1;
                console.log(`[RENDERING] Click counter: ${clicks}`);

            // Once finished clicking, parse content
            } else {
                clearInterval(showMore);
                console.log(`[PARSING] All content rendered, parsing...`);
                var articles = document.querySelector("div[class='SearchResults-main--3t9sI']").
                    querySelector("ol").children;
                for(let i = 0; i < articles.length; i++){
                    if (articles[i].querySelector("div").textContent == "Advertisement") continue;
                    content[i] = {
                        date     : articles[i].querySelector("time").textContent,
                        tag      : articles[i].querySelector("p[class='Item-section--1T6pp']").textContent,
                        headline : articles[i].querySelector("h4[class='Item-headline--3WqlT']").textContent,
                        summary  : articles[i].querySelector("p[class='Item-summary--3nKWX']").textContent
                    };
                }

                // Save content
                let n        = Object.keys(content).length;
                let columns  = Object.keys(content[0]);
                let keys     = Object.keys(content);
                console.log(`[SAVE] Saving ${n}/${n_results} parsed results`);
                
                // Add header
                columns.forEach(function(name){
                    csvContent += name + DELIMITER;
                });
                csvContent  = csvContent.substring(0, csvContent.length - 1);
                csvContent += "\r\n";

                // Add data
                for(let i = 0; i < n; i++){
                    let row = "";
                    for(let j = 0; j < columns.length; j++){
                        row += String(content[keys[i]][columns[j]]) + DELIMITER;
                    }
                    row         = row.substring(0, row.length - 1);
                    csvContent += row + "\r\n";
                }

                // Download file to disk using Blob
                var blobToSave = new Blob(["\ufeff", csvContent], {type: 'text/csv;charset=utf-8;'});
                var link       = document.createElement("a");
                link.href      = URL.createObjectURL(blobToSave);
                link.target    = '_blank';
                link.download  = saveName;
                link.click();

            }
        }, 750); // Do not make the speed too fast or clicks are unable to keep up

    // No more content to show, so begin parsing
    } else {
        console.log(`[PARSING] All content already rendered, parsing...`);
        var articles = document.querySelector("div[class='SearchResults-main--3t9sI']").
            querySelector("ol").children;
        for(let i = 0; i < articles.length; i++){
            if (articles[i].querySelector("div").textContent == "Advertisement") continue;
            content[i] = {
                date     : articles[i].querySelector("time").textContent,
                tag      : articles[i].querySelector("p[class='Item-section--1T6pp']").textContent,
                headline : articles[i].querySelector("h4[class='Item-headline--3WqlT']").textContent,
                summary  : articles[i].querySelector("p[class='Item-summary--3nKWX']").textContent
            };
        }

        // Save content
        let n        = Object.keys(content).length;
        let columns  = Object.keys(content[0]);
        let keys     = Object.keys(content);
        console.log(`[SAVE] Saving ${n}/${n_results} parsed results`);
        
        // Add header
        columns.forEach(function(name){
            csvContent += name + DELIMITER;
        });
        csvContent  = csvContent.substring(0, csvContent.length - 1);
        csvContent += "\r\n";

        // Add data
        for(let i = 0; i < n; i++){
            let row = ""
            for(let j = 0; j < columns.length; j++){
                row += String(content[keys[i]][columns[j]]) + DELIMITER;
            }
            row         = row.substring(0, row.length - 1);
            csvContent += row + "\r\n";
        }

        // Download file to disk using Blob
        var blobToSave = new Blob(["\ufeff", csvContent], {type: 'text/csv;charset=utf-8;'});
        var link       = document.createElement("a");
        link.href      = URL.createObjectURL(blobToSave);
        link.target    = '_blank';
        link.download  = saveName;
        link.click();
    }

})();

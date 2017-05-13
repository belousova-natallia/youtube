/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = paging;

function paging() {

   var active = document.getElementsByClassName('pagActive');

   var pageNum = document.getElementsByClassName('pageNumber');
   pageNum.forEach = [].forEach;

   pageNum.forEach(function (elem) {

      elem.classList.add('hidden');

      if (+elem.innerHTML <= +active[0].innerHTML + 3 && +elem.innerHTML >= +active[0].innerHTML - 2 || elem.innerHTML == 1) {

         elem.classList.remove('hidden');
      }
   });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__changePage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paging__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = showVideos;



function showVideos(obj, next) {
        console.log(obj.items);

        obj.items.forEach(function (item) {

                var title = item.snippet.title;
                var liVideo = document.createElement('li');
                liVideo.className = "video";

                var videoTitle = document.createElement('h2');
                var videoId = item.id;
                var href = `https://www.youtube.com/watch?v=${videoId}`;
                videoTitle.innerHTML = '<a target="_blank" href="' + href + '">' + title + '</a>';
                liVideo.appendChild(videoTitle);

                var img = document.createElement('img');
                img.src = item.snippet.thumbnails.medium.url;
                img.alt = item.snippet.title;
                liVideo.appendChild(img);

                var description = document.createElement('p');
                description.className = "description";
                description.innerHTML = item.snippet.description;
                liVideo.appendChild(description);

                var author = document.createElement('p');
                author.className = "author";
                author.innerHTML = item.snippet.channelTitle;
                liVideo.appendChild(author);

                var publishedAt = document.createElement('p');
                publishedAt.className = "publishedAt";
                publishedAt.innerHTML = item.snippet.publishedAt.slice(0, 10);
                liVideo.appendChild(publishedAt);

                var statistics = document.createElement('p');
                statistics.className = "statistics";
                statistics.innerHTML = item.statistics.viewCount;
                liVideo.appendChild(statistics);

                var containerUl = document.getElementById('searchUl');
                /*var w = parseInt(containerUl.style.width) + 325;
                console.log(containerUl.style.width)
                containerUl.style.width = w + 'px';  
                */
                containerUl.appendChild(liVideo);
        });

        var pagination = document.querySelector(".pagination");

        var n = pagination.lastChild ? +pagination.lastChild.innerHTML + 1 : 1;

        var k = Math.round(parseInt(document.getElementById("searchUl").style.width) / document.getElementById("search-container").offsetWidth);

        for (var i = n; i <= k; i++) {
                var pagLi = document.createElement('li');
                pagLi.className = "pageNumber";
                pagination.appendChild(pagLi);
                pagLi.innerHTML = i;
                if (i === 1) pagLi.classList.add('pagActive');
        }

        /*var paginationWidth = (pagLi.offsetWidth + 10)* n;
           pagination.style.width = paginationWidth + 'px';*/

        pagination.onclick = function (event) {
                var target = event.target; // где был клик?
                if (target.tagName == "LI") {
                        __WEBPACK_IMPORTED_MODULE_0__changePage__["a" /* changePage */].call(target, next);
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__paging__["a" /* paging */])();
                }
        };
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__showVideos__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = search;


function search() {

    var xhr = new XMLHttpRequest();

    var query = document.getElementById("query").value;

    var params = {
        part: 'snippet',
        q: encodeURIComponent(query),
        maxResults: 15,
        key: 'AIzaSyCQ5ISHNm7yvSUTIb8YSaz_6_mR-_71F_I'

    };

    var queryArr = [];
    for (var k in params) {
        queryArr.push(k + "=" + params[k]);
    }

    query = queryArr.join("&");
    var id = [];
    var idString;
    var next;
    xhr.open("GET", 'https://www.googleapis.com/youtube/v3/search?' + query);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status == 200) {
                var obj = JSON.parse(xhr.responseText);
                next = obj.nextPageToken;

                console.log(obj);

                obj.items.forEach(function (item) {
                    id.push(item.id.videoId);
                });
                idString = id.join(",");'';
                getVids(idString, next);
            } else {
                document.write("Ответ сервера " + xhr.statusText);
            }
        }
    };

    function getVids(idString, next) {
        var query2 = 'key=' + params.key + '&id=' + idString + '&part=snippet,statistics';

        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", 'https://www.googleapis.com/youtube/v3/videos?' + query2);
        xhr2.send();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == 4) {
                var status = xhr2.status;
                if (status == 200) {
                    var objRes = JSON.parse(xhr2.responseText);
                    console.log(objRes);
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__showVideos__["a" /* showVideos */])(objRes, next);
                } else {
                    document.write("Ответ сервера " + xhr2.statusText);
                }
            }
        };
    }
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = touchEvent;

function touchEvent() {
    var startPoint = {};
    var nowPoint;
    var ldelay;
    var searchUl = document.getElementById("searchUl");
    var width = document.getElementById("search-container").offsetWidth + 6;

    document.addEventListener('touchstart', function (event) {
        event.preventDefault();
        event.stopPropagation();
        startPoint.x = event.changedTouches[0].pageX;
        startPoint.y = event.changedTouches[0].pageY;
        ldelay = new Date();
    }, false);
    /*Ловим движение пальцем*/
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var otk = {};
        nowPoint = event.changedTouches[0];
        otk.x = nowPoint.pageX - startPoint.x;
        /*Обработайте данные*/
        /*Для примера*/
        if (Math.abs(otk.x) > 200) {
            if (otk.x < 0) {
                /*СВАЙП ВЛЕВО(ПРЕД.СТРАНИЦА)*/
                searchUl.style.transform = 'translateX(' + width + 'px)';
                searchUl.style['transition-duration'] = '1s';
            }
            if (otk.x > 0) {
                /*СВАЙП ВПРАВО(СЛЕД.СТРАНИЦА)*/
                searchUl.style.transform = 'translateX(-' + width + 'px)';
                searchUl.style['transition-duration'] = '1s';
            }
            startPoint = { x: nowPoint.pageX, y: nowPoint.pageY };
        }
    }, false);
    /*Ловим отпускание пальца*/
    document.addEventListener('touchend', function (event) {
        var pdelay = new Date();
        nowPoint = event.changedTouches[0];
        var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
        var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
        if ((xAbs > 20 || yAbs > 20) && pdelay.getTime() - ldelay.getTime() < 200) {
            if (xAbs > yAbs) {
                if (nowPoint.pageX < startPoint.x) {
                    /*СВАЙП ВЛЕВО*/
                    searchUl.style.transform = 'translateX(' + width + 'px)';
                    searchUl.style['transition-duration'] = '1s';
                } else {
                    /*СВАЙП ВПРАВО*/
                    searchUl.style.transform = 'translateX(' + width + 'px)';
                    searchUl.style['transition-duration'] = '1s';
                }
            } else {
                if (nowPoint.pageY < startPoint.y) {/*СВАЙП ВВЕРХ*/} else {/*СВАЙП ВНИЗ*/}
            }
        }
    }, false);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nextResults__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paging__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = changePage;



function changePage(next) {

     var pageNum = document.getElementsByClassName('pageNumber');
     pageNum.forEach = [].forEach;

     pageNum.forEach(function (elem) {
          elem.classList.remove('pagActive');
     });

     this.classList.add('pagActive');

     var that = this;

     var searchUl = document.getElementById("searchUl");
     var width = (document.getElementById("search-container").offsetWidth + 6) * (this.innerHTML - 1);

     if (searchUl.offsetWidth - width < 2500) {
          var w = parseInt(searchUl.style.width) + 4875;

          searchUl.style.width = w + 'px';
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__nextResults__["a" /* nextResults */])(next);
     }

     searchUl.style.transform = 'translateX(-' + width + 'px)';
     searchUl.style['transition-duration'] = '1s';
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__showVideos__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = nextResults;


function nextResults(next) {

    var xhr = new XMLHttpRequest();

    var query = document.getElementById("query").value;

    var params = {
        part: 'snippet',
        q: encodeURIComponent(query),
        maxResults: 15,
        pageToken: next,
        key: 'AIzaSyCQ5ISHNm7yvSUTIb8YSaz_6_mR-_71F_I'

    };

    var queryArr = [];
    for (var k in params) {
        queryArr.push(k + "=" + params[k]);
    }

    query = queryArr.join("&");
    var id = [];
    var idString;
    var nextNext;
    xhr.open("GET", 'https://www.googleapis.com/youtube/v3/search?' + query);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status == 200) {
                var obj = JSON.parse(xhr.responseText);
                nextNext = obj.nextPageToken;

                console.log(obj);

                obj.items.forEach(function (item) {
                    id.push(item.id.videoId);
                });
                idString = id.join(",");'';
                getVids(idString, nextNext);
            } else {
                document.write("Ответ сервера " + xhr.statusText);
            }
        }
    };

    function getVids(idString, next) {
        var query2 = 'key=' + params.key + '&id=' + idString + '&part=snippet,statistics';

        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", 'https://www.googleapis.com/youtube/v3/videos?' + query2);
        xhr2.send();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == 4) {
                var status = xhr2.status;
                if (status == 200) {
                    var objRes = JSON.parse(xhr2.responseText);
                    console.log(objRes);
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__showVideos__["a" /* showVideos */])(objRes, nextNext);
                } else {
                    document.write("Ответ сервера " + xhr2.statusText);
                }
            }
        };
    }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__touchEvent__ = __webpack_require__(3);



function renderPage() {
    var searchForm = document.createElement('div');
    searchForm.className = 'searchForm';
    document.body.appendChild(searchForm);
    var input = document.createElement('input');
    input.id = "query";
    searchForm.appendChild(input);
    var button = document.createElement('button');
    button.id = "search-button";
    searchForm.appendChild(button);
    button.innerHTML = "Search";
    button.addEventListener("click", function () {

        /* if(document.getElementById("search-container")){
                 var elem = document.getElementById("search-container");
                 elem.remove()}*/

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__search__["a" /* search */])();
    });

    var searchContainer = document.createElement('div');
    searchContainer.id = "search-container";
    document.body.appendChild(searchContainer);

    var ul = document.createElement('ul');
    ul.id = "searchUl";
    searchContainer.appendChild(ul);
    ul.style.width = '4875px';

    var pagination = document.createElement('ul');
    pagination.className = "pagination";

    searchContainer.appendChild(pagination);

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__touchEvent__["a" /* touchEvent */])();
}
renderPage();

/***/ })
/******/ ]);
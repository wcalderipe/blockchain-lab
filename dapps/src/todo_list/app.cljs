(ns ^:figwheel-hooks todo-list.app
  (:require [axios]))

(-> (.. axios (get "https://jsonplaceholder.typicode.com/todos/1"))
    (.then #(js/console.log %)))

(defn ^:after-load re-render []
  (js/console.log "re-render"))

(js/console.log "hello")

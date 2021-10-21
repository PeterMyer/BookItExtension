import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SingleArticle } from "./SingleArticle";
import Sidebar from "./Navigation/Sidebar";
import { useHistory } from "react-router-dom";
import { getUserArticles } from "../store/userArticles";

export function UserArticles() {
    const articles = useSelector((state) => state.userArticles);
    const filteredTags = useSelector((state) => state.tags.filteredTags);
    const user = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const history = useHistory();

    articles.forEach((element) => {
        const tags = element.taggings.map((item) => item.tag.name);
        element.tags = tags;
    });
    // console.log("ALL ARTICLES > ", articles);
    // console.log("ALL FILTERD TAGS > ", filteredTags);

    useEffect(() => {
        dispatch(getUserArticles(user.id));
    }, [dispatch]);
    //
    function clickHandlerShare() {
        history.push("/share/message");
    }

    function clickHandlerTabView() {
        history.push("/home/tab");
    }

    function validateFilter(article) {
        if (filteredTags && filteredTags.length > 0) {
            const containsTag = article.tags.some((tag) =>
                filteredTags.includes(tag)
            );
            if (containsTag) {
                return true;
            } else {
                const containsKeyValue = filteredTags.every(
                    (key) => article[key] && article[key] !== false
                );

                return containsKeyValue;
            }
        }
        return true;
    }

    if (articles.length === 0) {
        return (
            <div className="user-articles--username-div">
                {/* <Topbar /> */}
                <h3>You don't have any articles.</h3>
            </div>
        );
    }

    return (
        <div className="main-user-article--container">
            <div className="left-side--user-article-container">
                <Sidebar />
            </div>
            <div className="right-side--user-article-container">
                <div className="user-articles--username-div">
                    <h3>
                        {user.username[0].toUpperCase() +
                            user.username.slice(1)}
                        's articles
                    </h3>
                </div>
                <div className="display-articles--container">
                    {articles
                        .filter((article) => validateFilter(article))
                        .map((article) => {
                            return (
                                <div
                                    key={article.id}
                                    className="singleContainer"
                                >
                                    <SingleArticle article={article} />
                                </div>
                            );
                        })}
                </div>
                <button
                    onClick={(e) => clickHandlerTabView()}
                    id="tabViewButton"
                >
                    Show me table view
                </button>
                <button onClick={(e) => clickHandlerShare()} id="shareButton">
                    Share list with my friends!
                </button>
            </div>
        </div>
    );
}

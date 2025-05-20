import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick, submit } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Summary = () => {
	// Tracks our current article, used for display of summary
	const [article, setArticle] = useState({
		url: "",
		summary: "",
	});
	// We use this state to keep track of all articles we searched for
	const [allArticles, setAllArticles] = useState([]);
	// Keep track of data for clipboard
	const [copied, setCopied] = useState("");

	// Lazy load
	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

	useEffect(() => {
		const articlesFromLocalStorage = JSON.parse(
			localStorage.getItem("articles")
		);

		if (articlesFromLocalStorage) {
			setAllArticles(articlesFromLocalStorage);
		}
	}, []);

	// Calls OPENAI API from Rapid API for summary and sets info to our states
	const handleSubmit = async (e) => {
		e.preventDefault();

		const { data } = await getSummary({ articleUrl: article.url });
		if (data?.summary) {
			const newArticle = { ...article, summary: data.summary };
			const updatedAllArticles = [newArticle, ...allArticles];

			setArticle(newArticle);
			// Update all articles state
			setAllArticles(updatedAllArticles);
			// When we get summary we set key 'articles' with value of all articles
			localStorage.setItem(
				"articles",
				JSON.stringify(updatedAllArticles)
			);
		}
	};

	// Copies link from selected history into clipboard
	const handleCopy = (copyUrl) => {
		setCopied(copyUrl);
		navigator.clipboard.writeText(copyUrl);
		setTimeout(() => setCopied(false), 3000);
	};

	return (
		<section className="mt-16 w-full max-w-4xl">
			<div className="flex flex-col w-full gap-2">
				<h2 className="font-satoshi font-bold text-gray-200 text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
					<span className="green_gradient">Link Selected:</span>
				</h2>
				<form
					className="relative flex justify-center items-center"
					onSubmit={handleSubmit}
				>
					<img
						src={linkIcon}
						alt="link-icon"
						className="absolute left-0 my-2 ml-3 w-5"
					/>

					<input
						type="url"
						placeholder="Please enter website link"
						value={article.url}
						onChange={(e) =>
							setArticle({ ...article, url: e.target.value })
						}
						onKeyDown={(e) => {}}
						required
						className="url_input peer"
					/>
					<button
						type="submit"
						className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
					>
						<img src={submit} alt=">" className="w-5" />
					</button>
				</form>

				{/* Summary history section */}
				<div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
					{allArticles.length == 0 ? null : (
						<h2 className="mt-5 font-satoshi font-bold text-gray-200 text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
							<span className="green_gradient">
								Link History:
							</span>
						</h2>
					)}
					{allArticles.reverse().map((item, index) => (
						<div
							key={`link-${index}`}
							onClick={() => {
								setArticle(item);
								handleCopy(item.url);
							}}
							className="link_card"
						>
							<div className="copy_btn">
								<img
									src={copied === item.url ? tick : copy}
									alt={
										copied === item.url
											? "tick_icon"
											: "copy_icon"
									}
									className="w-[40%] h-[40%] object-contain"
								/>
							</div>
							<p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
								{item.url}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Article summary */}
			<div className="my-7 max-w-full flex justify-center items-center">
				{isFetching ? (
					<img
						src={loader}
						alt=""
						className="w-20 h-20 object-contain"
					/>
				) : error ? (
					<p className="font-inter font-bold text-black text-center">
						Something went wrong...
						<br />
						<span className="font-satoshi font-normal text-gray-700">
							{error?.data?.error}
						</span>
					</p>
				) : (
					article.summary && (
						<div>
							<div className="flex flex-col gap-3">
								<h2 className="font-satoshi font-bold text-gray-200 text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
									<span className="green_gradient">
										Link Summary:
									</span>
								</h2>
								<div
									className="summary_box flex flex-col items-center cursor-pointer"
									onClick={() => handleCopy(article.summary)}
								>
									{/* floating icon */}
									<div className="copy_btn_summary mb-2">
										{copied === article.summary ? (
											<span className="text-sm font-medium text-black">
												Copied!
											</span>
										) : (
											<img
												src={copy}
												alt="copy_icon"
												className="object-contain"
											/>
										)}
									</div>
									<p className="font-inter font-medium text-sm text-gray-700">
										{article.summary}
									</p>
								</div>
							</div>
							{/* <div className="flex flex-col gap-3 mt-3 items-center">
								<div
									className="copy_btn_summary"
									onClick={() => handleCopy(article.summary)}
								>
									<img
										src={
											copied === article.summary
												? tick
												: copy
										}
										alt={
											copied === article.summary
												? "tick_icon"
												: "copy_icon"
										}
										className="object-contain"
									/>
								</div>
							</div> */}
						</div>
					)
				)}
			</div>
		</section>
	);
};

export default Summary;

import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <div>Dashboard page</div>
      <Link href="/articles/breaking-news-123?lang=en">Read in english</Link>
      <Link href="/articles/breaking-news-123?lang=fr">Read in french</Link>
    </>
  );
}

export default page;

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {Fragment} from "react";
import Auth from "../components/Auth/Auth";
import Hero from "../components/Home/Hero";

export default function Home() {
  return (
    <Fragment>
        <Hero />
    </Fragment>
  );
}

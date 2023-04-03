import Image from "next/image";
import LogoImage from "../../../public/nitrogql-logo.png";
import styles from "./page.module.css";
import { Figures } from "@/components/Figures";
import figureCheckSchema from "./figures/screenshot-check-schema.png";
import figureCheckOperation from "./figures/screenshot-check-operation.png";

export default function Home() {
  return (
    <>
      <div className={styles.main}>
        <hgroup>
          <p>
            <Image src={LogoImage} alt="nitrogql logo" />
          </p>
          <h1>
            <span>nitrogql</span>
          </h1>
          <p>
            GraphQL + TypeScript <wbr />
            Done Right.
          </p>
        </hgroup>
        <main>
          <p>
            <b>nitrogql</b> is a toolchain for using GraphQL with TypeScript. It
            can <strong>generate TypeScript types</strong> from your GraphQL
            schema and queries, and also{" "}
            <strong>provides static checking</strong> for your queries.
          </p>
          <section className={styles.features}>
            <h2>✨ Available Features</h2>
            <h3>Static Checks for GraphQL</h3>
            <p>
              nitrogql CLI can perform static checks for your GraphQL schema and
              operations. They are helpful for catching GraphQL-related errors
              before you run your code.
            </p>
            <p>
              Add nitrogql to your CI pipeline so that you never see GraphQL
              errors at runtime.
            </p>
            <Figures>
              <figure>
                <Image
                  src={figureCheckSchema}
                  alt="Screenshot of console in which `nitrogql check` is run.
                  The output shows an error message saying `Type 'Strong' is not defined`
                  for the line `body: Strong!` in the schema.
                "
                />
                <figcaption>
                  nitrogql can find mistakes in your schema definition.
                </figcaption>
              </figure>
              <figure>
                <Image
                  src={figureCheckOperation}
                  alt="Screenshot of console in which `nitrogql check` is run.
                  The output shows an error message saying Field 'next' is not found on type 'Todo'`
                  for the line `text` in a query operation.
                "
                />
                <figcaption>
                  nitrogql can also check your operations against the schema.
                </figcaption>
              </figure>
            </Figures>
          </section>
        </main>
      </div>
    </>
  );
}

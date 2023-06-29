import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TerminusWebApp } from "../target/types/terminus_web_app";

describe("terminus-web-app", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TerminusWebApp as Program<TerminusWebApp>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});

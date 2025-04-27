{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.rustc
    pkgs.cargo
    pkgs.pkg-config
    pkgs.webkitgtk
    pkgs.openssl
    pkgs.gtk3
    pkgs.git
  ];

  shellHook = ''
    export PATH=$PATH:~/.cargo/bin
  '';
}

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
    pkgs.mesa
    pkgs.libsoup_3
    pkgs.webkitgtk
    pkgs.libGL
  ];

  shellHook = ''
    export PATH=$PATH:~/.cargo/bin
    export PKG_CONFIG_PATH="${pkgs.webkitgtk.dev}/lib/pkgconfig:${pkgs.webkitgtk.dev}/share/pkgconfig:$PKG_CONFIG_PATH"
  '';
}

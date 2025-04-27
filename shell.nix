let
  pkgs = import <nixpkgs> {};
  pkgConfigPath = "${pkgs.webkitgtk_4_0.dev}/lib/pkgconfig:${pkgs.webkitgtk_4_0.dev}/share/pkgconfig:${pkgs.libsoup_2_4.dev}/lib/pkgconfig";
in
pkgs.mkShell {
  nativeBuildInputs = with pkgs; [ pkg-config gobject-introspection cargo cargo-tauri nodejs ];
  buildInputs = with pkgs; [
    at-spi2-atk atkmm cairo gdk-pixbuf glib gtk3 harfbuzz librsvg
    libsoup_2_4
    pango webkitgtk_4_0 openssl
  ];
  shellHook = ''
    export PATH=$PATH:~/.cargo/bin
    export PKG_CONFIG_PATH=${pkgConfigPath}:$PKG_CONFIG_PATH
    echo "PKG_CONFIG_PATH set to: $PKG_CONFIG_PATH"
  '';
}

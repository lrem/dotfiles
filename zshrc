export PS1='%d $ '
export PATH=/Users/lrem/.bin:/usr/local/bin:/usr/local/share/python:/usr/bin:/bin:/usr/sbin:/sbin:/usr/texbin:/usr/X11/bin:/Developer/QtSDK/Desktop/Qt/474/gcc/bin/:/Users/lrem/.gem/ruby/1.8/bin:/usr/local/share/python3/:${HOME}/Applications/IBM/ILOG/CPLEX_Studio125/cplex/bin/x86-64_darwin:${HOME}/.cabal/bin/:/usr/local/Cellar/ruby/1.9.3-p194/bin:/usr/local/share/pypy:/usr/local/Cellar/perl/5.14.3/bin/
export EDITOR="mvim -f"
export CLICOLOR="cons25"
#export ILOG_LICENSE_FILE="/Users/lrem/Applications/IBM/access.ilm"

alias pylab="ipython notebook --pylab inline"
alias vim="mvim"


bindkey -e
bindkey '^[[H' beginning-of-line
bindkey '^[[F' end-of-line

# The following lines were added by compinstall

zstyle ':completion:*' completer _expand _complete _ignored
zstyle ':completion:*' max-errors 1
zstyle :compinstall filename '/Users/lrem/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall
# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=10000
SAVEHIST=10000
setopt appendhistory
# End of lines configured by zsh-newuser-install
export CPPFLAGS="-I/usr/local/opt/freetype/include/freetype2/ -I/usr/local/opt/freetype/include/ -I/usr/local/opt/libpng/include"
export LDFLAGS="-L/usr/local/opt/freetype/lib -L/usr/local/opt/libpng/lib"

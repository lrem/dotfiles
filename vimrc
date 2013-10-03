" Sanity
set nocompatible

" Vundle startup, when deploying remember to run:
" git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle
filetype off
set rtp+=~/.vim/bundle/vundle/
call vundle#rc()
Bundle 'gmarik/vundle'

" Turn on the magic
syntax on
set autoindent
filetype plugin indent on

" Automatic formatting options
set ts=4 sw=4 sts=4 et textwidth=79
set formatoptions=qrn1tcj

" Display options
set showcmd ruler linebreak ttyfast 
" Always show status line
set laststatus=2 
" At least two lines of context
set scrolloff=2

" Search options
set incsearch

" Load per-file settings
set modeline modelines=5

" Tab completion on commands like :edit
set wildmenu

"Reselect visual block after indent/outdent 
vnoremap < <gv
vnoremap > >gv

" Don't suggest opening output files
set wildignore+=*.o,*.pyc,*.p,*.pdf,coverage/**,out/**

let mapleader=","

" Function keys bindings
map <F2> :w<cr>
map <F5> :!aspell -t --dont-tex-check-comments -d pl -c %<cr>
map <F6> :!aspell -t --dont-tex-check-comments -d en -c %<cr>
map <F7> :!pylint -rn --disable=W0614,W0401,W0142,W0141 %<cr>
map <F8> :!./%<cr>
au BufNewFile,BufRead *.c map <F9> :!clang -g -Wall -pedantic -o `basename % .c` %<cr>
au BufNewFile,BufRead *.hs map <F9> :!ghc -Wall %<cr>
au BufNewFile,BufRead *.tex map <F9> :!pdflatex % && open `dirname %`/`basename % .tex`.pdf<cr>
au BufNewFile,BufRead *.md map <F9> :!markdownize %<cr>
au BufNewFile,BufRead *.txt map <F9> :!markdownize %<cr>
au BufNewFile,BufRead *.coffee map <F9> :!coffee -c %<cr>
map <F10> :!make 2>&1<cr>
map <F11> :!repo diff \| view -<cr>
map <F12> :!repo commit<cr>

" Make them work in insert mode
imap <F2> <esc><F2>a
imap <F3> <esc><F2>a
imap <F4> <esc><F2>a
imap <F5> <esc><F5>a
imap <F6> <esc><F6>a
imap <F7> <esc><F7>a
imap <F8> <esc><F8>a
imap <F9> <esc><F9>a
imap <F10> <esc><F10>a
imap <F11> <esc><F11>a
imap <F12> <esc><F12>a

" Additional file types
au BufNewFile,BufRead *.tt setf html
au BufNewFile,BufRead *.md setlocal filetype=markdown
au BufNewFile,BufRead *.txt setlocal filetype=markdown

" Better auto-completion, on deploying run:
" cd ~/.vim/bundle/YouCompleteMe && ./install.sh --clang-completer 
Bundle 'Valloric/YouCompleteMe'
" To get C/C++ working, look into (by default enables C++):
" https://raw.github.com/Valloric/YouCompleteMe/master/cpp/ycm/.ycm_extra_conf.py
let g:ycm_extra_conf_globlist = ['~/*.py']

" Automatic error reporting, in synergy with the above
Bundle 'scrooloose/syntastic'

" Debugger integration (this can't be handled by vundle as of now :( )
au BufNewFile,BufRead *.py map <S-F8> :Pyclewn pdb %<cr> :Cmapkeys<cr>
map <C-s> :Cstep<cr>

" Class explorer
Bundle 'majutsushi/tagbar'
map <leader>o :TagbarToggle<cr>
let Tlist_GainFocus_On_ToggleOpen=1
let Tlist_Close_On_Select=1
let Tlist_Exit_OnlyWindow=1
let Tlist_Use_SingleClick=1

" Directory tree explorer
Bundle 'scrooloose/nerdtree'
map <leader>t :NERDTreeToggle<cr>

" Fuzzy file opener
Bundle 'kien/ctrlp.vim'
nnoremap tt :CtrlP<cr>

" vim: set nowrap:

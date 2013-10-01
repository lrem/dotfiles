" Display options
set guifont=Source\ Code\ Pro:h13.00
set guioptions=aceg
set spell
set cursorline
set co=80

" Making a window full-width or 80-columns
nnoremap <leader>F :set co=999<cr>:set number<cr>
nnoremap <leader>f :set co=80<cr>:set nonumber<cr>

" Don't start a console vim inside macvim
map <F11> :!repo diff \| mvim -R -<cr>

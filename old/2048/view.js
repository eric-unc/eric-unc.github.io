const $root = $('#root');
const size = 4;

export function createBase() {
    $root.append(
        $('<section>').addClass('section').append( // Title section
            $('<div>').addClass('container').append(
                $('<h1>').html("2048 Game").addClass('title')
            ).append(
                $('<h4>').html("By Eric Schneider").addClass('subtitle')
            )
        )
    ).append(
        $('<section>').addClass('section').append(
            $('<div>').addClass('container').append(
                $('<button>')
                    .addClass('button is-danger')
                    .attr('id', 'reset-game')
                    .html("Reset")
            )
        ).append(
            $('<div>').addClass('container').attr('id', 'board-container').append(
                createBoard(new Array(size * size).fill(0))
            )
        ).append(
            $('<div>').addClass('container').attr('id', 'score-container').append(
                createScore(0)
            )
        ).append(
            $('<div>').addClass('container').attr('id', 'status-container').append(
                createStatus('inprogress')
            )
        )
    ).append(
        $('<section>').addClass('section').append( // Description section
            $('<div>').addClass('container').append(
                $("<div>").addClass('notification is-primary').append(
                    $('<p>')
                        .html(`Welcome to 2048! To play, use the arrow keys or WASD to move
                        the tiles around the screen. Tiles of the same number will merge, and
                        give you points. Reaching a tile of 2048 will make you win, but if
                        you're really good you can get 4096!`)
                )
            )
        )
    );
}

function createBoard(boardVals){ // This only supports 4x4 lol
    return $('<table>').addClass('table is-fullwidth tile is-ancestor is-vertical').append(
        $('<tr>').addClass('tile is-parent').append(
            $('<td>').html(createTile(boardVals[0]))
        ).append(
            $('<td>').html(createTile(boardVals[1]))
        ).append(
            $('<td>').html(createTile(boardVals[2]))
        ).append(
            $('<td>').html(createTile(boardVals[3]))
        )
    ).append(
        $('<tr>').addClass('tile is-parent').append(
            $('<td>').html(createTile(boardVals[4]))
        ).append(
            $('<td>').html(createTile(boardVals[5]))
        ).append(
            $('<td>').html(createTile(boardVals[6]))
        ).append(
            $('<td>').html(createTile(boardVals[7]))
        )
    ).append(
        $('<tr>').addClass('tile is-parent').append(
            $('<td>').html(createTile(boardVals[8]))
        ).append(
            $('<td>').html(createTile(boardVals[9]))
        ).append(
            $('<td>').html(createTile(boardVals[10]))
        ).append(
            $('<td>').html(createTile(boardVals[11]))
        )
    ).append(
        $('<tr>').addClass('tile is-parent').append(
            $('<td>').html(createTile(boardVals[12]))
        ).append(
            $('<td>').html(createTile(boardVals[13]))
        ).append(
            $('<td>').html(createTile(boardVals[14]))
        ).append(
            $('<td>').html(createTile(boardVals[15]))
        )
    );
}

function createTile(num){ // TODO: could make this look nicer lol
    let img;

    switch(num){
        case 0:
            img = "0.jpg";
            break;
        case 2:
            img = "2.jpeg";
            break;
        case 4:
            img = "4.jpg";
            break;
        case 8:
            img = "8.jpg";
            break;
        case 16:
            img = "16.jpg";
            break;
        case 32:
            img = "32.jpg";
            break;
        case 64:
            img = "64.jpg";
            break;
        case 128:
            img = "128.jpg";
            break;
        case 256:
            img = "256.jpg";
            break;
        case 512:
            img = "512.jpg";
            break;
        case 1024:
            img = "1024.gif";
            break;
        case 2048:
            img = "2048.jpg";
            break;
        case 4096:
            img = "4096.jpg";
            break;
        default:
            return $('<div>').addClass('tile is-child image is-64x64 box').html(num === 0 ? ' ' : num);
    }

    return $('<figure>').addClass('tile image is-64x64').append(
        $('<img>').attr('src', './assets/' + img)
    );
}

export function updateBoard(boardVals){
    $('#board-container').html(createBoard(boardVals));
}

function createScore(score){
    return $('<p>').html("The score is: " + score);
}

export function updateScore(score){
    $('#score-container').html(createScore(score));
}

function createStatus(status){
    switch (status){
        case 'inprogress':
            return $('<p>').append("This game is ongoing.");
        case 'win':
            return $('<p>').append($('<strong>').html("You've won!"));
        case 'lose':
            return $('<p>').append($('<strong>').html("You've lost!"));
    }
}

export function updateStatus(status){
    $('#status-container').html(createStatus(status));
}

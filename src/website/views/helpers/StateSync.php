<?php

class Zend_View_Helper_StateSync extends \Zend_View_Helper_Abstract
{

    private $storage;

    /*
        $option
            0 = default
            1 = hide data
            2 = show hidden editable
    */

    public function stateSync($query=null, $option=0)
    {
        if($query) {
            return $this->query($query);
        }
        else {
            return $this->init($option);
        }
    }

    private function init($option) {

        if($this->view->editmode) {
            // data storage editable
            echo '<div style="display:'.($option==2?'block':'none').'">';
            echo $this->view->input("__statesync__");
            echo '</div>';
        }

        // include StateSync library
        echo '<script src="/website/static/js/vendor/statesync.js"></script>';

        // set storage var
        $data = $this->view->input("__statesync__")->text;
        $data = $data == "" ? "{}" : $data;

        $this->storage = json_decode($data, true);

        //inject environment
        if($option!=1 || $this->view->editmode) {
            echo '<script>stateSync.editmode='.($this->view->editmode?1:0).';';
            echo 'stateSync.storage('.$data.');</script>';
        }
    }

    private function query($query) {
        return $this->storage[$query];
    }

}
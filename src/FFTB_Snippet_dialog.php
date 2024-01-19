<style>
    .mp_header {
        position: fixed;
        top: 55px;
        display: none;
        background: #fff;
        width: 80%;
    }
    .mp_header th {
        text-align: left;
    }

    #fftb_info_dlg .mp_module {
        
        min-height: 110px;
        width: 80%;
        border: 4px solid #e00;
        padding: 10px;
        border-radius: 4px;
        margin: 10px auto;
    }
    
    #fftb_info_dlg .mp_module.active {
        border-color: #0e0;
    }
        
</style><div id="fftb_info_dlg" class="modal modal-xl fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="width: 80%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Personal <div class="btn-group"><label for="mp_employee_force" class="btn"><input type="checkbox" id="mp_employee_force"> alles neuladen</label> <button type="button" class="btn btn-default" id="mp_personal_refresh">Neu laden <span></span></button> <a href="" class="btn btn-primary" id="mp_personal_export">Exportieren</a></div></h4>
      </div>
      <div class="modal-body" style="height: 90%; overflow: auto;">
        <div class="row">
            <div class="col-xs-3"><label for="mp_employee_qualification">Ausbildung filtern:</label></div>
            <div class="col-xs-9"><select id="mp_employee_qualification"></select></div>
        </div>
        <hr width="100%">
        <div style="height: 20px;"></div>
        <div class="row">
            <div id="mp_employee_list" class="col-xs-12 col-lg-10 col-lg-push-1 " style="height: 85%;">
                <div class="mp_header">
                    <table>
                        <thead>
                            <tr>
                                <th>Wache</th>
                                <th>Name</th>
                                <th>Ausbildung</th>
                                <th>Fahrzeug</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <table class="sortable">
                    <thead>
                        <tr>
                            <th>Wache</th>
                            <th>Name</th>
                            <th>Ausbildung</th>
                            <th>Fahrzeug</th>
                        </tr>
                    </thead>
                    <tbody id="mp_employee_list_body">
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<div id="mp_info_dlg" class="modal modal-xl fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document" style="width: 80%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"><i class="glyphicon glyphicon-info-sign"></i> &Uuml;ber mp_leitstellenspiel_extras</h4>
      </div>
      <div class="modal-body" style="height: 90%; overflow: auto;">
        <div class="row">
            <div class="col-xs-2 col-xs-push-10">Version: <span id="mp_version"></span></div>
            <div class="col-xs-10 col-xs-pull-2">Dieser Dialog ist unter Profil -> &Uuml;ber mp_leitstellenspiel_extras zu erreichen</div>
        </div>
        <div id="mp_info_new_version" style="display: none;">
            <div class="row">
                <div class="col-xs-12"><h1>Neue Version wurde installiert <i class="glyphicon glyphicon-bell"></i></h1></div>
            </div>
            <div class="row">
                <div class="col-xs-12 latest-changes"></div>
            </div>
        </div>
        <hr>
        <div style=" height: 20px;"></div>
        <div class="row">
            <div class="col-xs-12"><h2>Module</h2></div>
        </div>
        <div class="row" id="mp_modules">            
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12"><sup><i class="glyphicon glyphicon-warning-sign"></i></sup> Die Skripte versto&szlig;en ggfs. gegen die ABG von LSS</div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

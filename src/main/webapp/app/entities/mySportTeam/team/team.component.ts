import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITeam } from 'app/shared/model/mySportTeam/team.model';
import { TeamService } from './team.service';
import { TeamDeleteDialogComponent } from './team-delete-dialog.component';

@Component({
  selector: 'jhi-team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit, OnDestroy {
  teams: ITeam[];
  eventSubscriber: Subscription;

  constructor(protected teamService: TeamService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.teamService.query().subscribe((res: HttpResponse<ITeam[]>) => {
      this.teams = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTeams();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITeam) {
    return item.id;
  }

  registerChangeInTeams() {
    this.eventSubscriber = this.eventManager.subscribe('teamListModification', () => this.loadAll());
  }

  delete(team: ITeam) {
    const modalRef = this.modalService.open(TeamDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.team = team;
  }
}
